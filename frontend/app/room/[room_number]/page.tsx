type RoomPageProps = {
  params: Promise<{
    room_number: string
  }>
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { room_number } = await params
  const roomNumber = room_number

  return (
    <div className="p-4 bg-white w-full min-h-screen">
      <h1 className="text-2xl text-pink-400 font-bold">
        Reserve Meeting Room {roomNumber}
      </h1>
      <div className="flex">
        <div className="text-black">Select Date:</div> 
      </div>

    </div>
  )
}
