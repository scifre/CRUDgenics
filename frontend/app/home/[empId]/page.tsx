"use client";
import { useEffect, useState } from "react";
import Body from "../../components/body";

export default function HomeWithId({ params }: { params: Promise<{ empId: string }> }) {
  const [empId, setEmpId] = useState<string>("");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    params.then(({ empId }) => {
      setEmpId(empId);
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-details?emp_id=${empId}`)
        .then((res) => res.json())
        .then((data) => setUserDetails(data.user));
    });
  }, [params]);

  return (
    <>
      <div className="p-4 text-sm text-white-600 flex flex-row items-center gap-4">
        <div>
          <p className="font-bold">Employee:</p> {empId}
        </div>
        <div>
          <p className="font-bold">Department:</p> {userDetails?.department}
        </div>  
        <div>
          <p className="font-bold">Designation:</p> {userDetails?.designation}
        </div>
      </div>
      <Body empId={empId} />
    </>
  );
}
