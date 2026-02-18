export const EmptyLayout = ({children} : any) => {
  return (
    <div
      className="empty-layout"
      style={{ width:'81vw', height: '90vh',display: 'flex', flexDirection: 'column', padding:"16px" }}
    >
      {children}
    </div>
  )
}