export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Ticketdeck</a>
        </div>
        <div className="navbar-end">
          <a className="btn btn-accent btn-outline">Login</a>
        </div>
      </div>
    </>
  );
}
