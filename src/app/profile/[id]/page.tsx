export default async function UserProfilePage({params}: any){
    const {id} = await params
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            
            <p>User ID: {id}</p>
        </div>
    )
}