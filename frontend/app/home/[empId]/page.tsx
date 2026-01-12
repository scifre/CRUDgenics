import Body from "../../components/body";

export default async function HomeWithId({ params }: { params: Promise<{ empId: string }> }) {
  const { empId } = await params;
  return (
    <>
      <div className="p-4 text-sm text-gray-600">Employee: {empId}</div>
      <Body empId={empId} />
    </>
  );
}
