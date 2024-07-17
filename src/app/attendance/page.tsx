"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import "./style.css";

interface Attendance {
  name: string;
  content: string;
  check: boolean;
  author: string;
  grade: string;
  class: string;
  studentnumber: string;
}

export default function Page() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [conformselectedCount, conformsetSelectedCount] = useState<number>(1);
  const [studentData, setStudentData] = useState<
    { name: string; grade: string; clss: string; studentnumber: string }[]
  >([]);
  const [firstcommitstudent, setfirstcommitstudent] = useState<
    {
      check: number; // 0 for 'n', 1 for 'y'
      comment: string;
      author: string;
    }[]
  >([]);

  const { data: session } = useSession();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    conformsetSelectedCount(parseInt(e.target.value));
  };

  const handleconformcount = () => {
    if (isNaN(conformselectedCount)) {
      setSelectedCount(1);
    } else {
      setSelectedCount(conformselectedCount);
      setStudentData(
        Array.from({ length: conformselectedCount }, () => ({
          name: "",
          grade: session?.user?.grade || "",
          clss: session?.user?.class || "",
          studentnumber: "",
        }))
      );

      setfirstcommitstudent(
        Array.from({ length: conformselectedCount }, () => ({
          check: 0,
          comment: "",
          author: session?.user?.name || "",
        }))
      );
    }
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = [...studentData];
    newData[index] = { ...newData[index], [field]: value };
    setStudentData(newData);
  };

  const handleCommitChange = (index: number, field: string, value: string) => {
    const newData = [...firstcommitstudent];
    newData[index] = { ...newData[index], [field]: value };
    setfirstcommitstudent(newData);
  };

  const handleCheckboxChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newData = [...firstcommitstudent];
    newData[index] = {
      ...newData[index],
      check: event.target.name === "n" ? 0 : 1,
    };
    setfirstcommitstudent(newData);
  };

  const handleSubmit = () => {
    fetch("/api/post/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentData, firstcommitstudent }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        closeModal();
        setIsLoading(true);
        fetch("/api/post/attendance")
          .then((response) => response.json())
          .then((data: Attendance[]) => {
            setAttendance(data);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePatch = () => {
    console.log(firstcommitstudent);
    fetch("/api/post/attendance", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstcommitstudent }),
    });
  };

  //처음 로딩
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/post/attendance")
      .then((response) => response.json())
      .then((data: Attendance[]) => {
        setAttendance(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (attendance.length === 0) {
    return (
      <>
        <div>이런! 등록하신 반 학생들의 정보가 없어요</div>
        <button onClick={openModal}>등록하기</button>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>인원을 입력해주세요</p>
              <input
                type="text"
                placeholder="인원"
                onChange={handleSelectChange}
              />
              <button onClick={handleconformcount}>인원 추가</button>
              <div className="scroll-container-attendance">
                {[...Array(selectedCount)].map((_, index) => (
                  <div key={index} className="input-group">
                    <input
                      type="text"
                      placeholder="이름"
                      value={studentData[index]?.name || ""}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={studentData[index]?.grade || ""}
                      placeholder="학년"
                      onChange={(e) =>
                        handleInputChange(index, "grade", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={studentData[index]?.clss || ""}
                      placeholder="반"
                      onChange={(e) =>
                        handleInputChange(index, "clss", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={studentData[index]?.studentnumber || ""}
                      placeholder="번호"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "studentnumber",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit}>확인</button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <div>
          <div className="attendance-container">
            <button onClick={openModal}>학생 추가</button>
            <button>선택항목 일괄 옵션적용</button>
            {attendance.map((data, i) => (
              <div className="attendance-student" key={i}>
                <input
                  type="checkbox"
                  name="attendance-checkbox"
                  onChange={(e) => handleCheckboxChange(i, e)}
                />
                <p>{data.name}</p>
                <p>{data.grade}학년</p>
                <p>{data.class}반</p>
                <p>{data.studentnumber}번</p>
                <input
                  type="text"
                  placeholder="미출석 사유"
                  value={firstcommitstudent[i]?.comment || ""}
                  onChange={(e) =>
                    handleCommitChange(i, "comment", e.target.value)
                  }
                />
                <input
                  type="checkbox"
                  name="n"
                  checked={firstcommitstudent[i]?.check === 0}
                  onChange={(e) => handleCheckboxChange(i, e)}
                />
                <input
                  type="checkbox"
                  name="y"
                  checked={firstcommitstudent[i]?.check === 1}
                  onChange={(e) => handleCheckboxChange(i, e)}
                />
              </div>
            ))}
          </div>
        </div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>인원을 입력해주세요</p>
              <input
                type="text"
                placeholder="인원"
                onChange={handleSelectChange}
              />
              <button onClick={handleconformcount}>인원 추가</button>
              <div className="scroll-container-attendance">
                {[...Array(selectedCount)].map((_, index) => (
                  <div key={index} className="input-group">
                    <input
                      type="text"
                      placeholder="이름"
                      value={studentData[index]?.name || ""}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={studentData[index]?.grade || ""}
                      placeholder="학년"
                      onChange={(e) =>
                        handleInputChange(index, "grade", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={studentData[index]?.clss || ""}
                      placeholder="반"
                      onChange={(e) =>
                        handleInputChange(index, "clss", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={studentData[index]?.studentnumber || ""}
                      placeholder="번호"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "studentnumber",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit}>확인</button>
            </div>
          </div>
        )}

        <button className="ok-button" onClick={handlePatch}>
          출석 정보 저장
        </button>
      </>
    );
  }
}
