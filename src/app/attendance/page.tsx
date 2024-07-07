"use client";
import { useState, useEffect } from "react";

interface Attendance {
  name: string;
  content: string;
  check: boolean;
  author: string;
}

export default function Page() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [conformselectedCount, conformsetSelectedCount] = useState<number>(1);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    conformsetSelectedCount(parseInt(e.target.value));
  };

  const handleconformcount = () => {
    if (isNaN(conformselectedCount)) {
      setSelectedCount(1);
    }
    setSelectedCount(conformselectedCount);
  };
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/post/attendance")
      .then((response) => response.json())
      .then((data: Attendance[]) => {
        setAttendance(data);
        setIsLoading(false);
      });
  }, []);

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
              <button onClick={handleconformcount}>확인</button>
              <input
                type="text"
                placeholder="인원"
                onChange={handleSelectChange}
              />
              {[...Array(selectedCount)].map((_, index) => (
                <div key={index} className="input-group">
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="학년" />
                  <input type="text" placeholder="번호" />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <div>{/* 실제 데이터 표시 */}</div>;
  }
}
