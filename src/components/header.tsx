import { NavLink, type NavLinkProps } from 'react-router';

function Link(props: NavLinkProps) {
  return (
    <NavLink {...props} className={({ isActive }) => `font-semibold ${isActive ? 'text-primary' : 'text-secondary'}`} />
  );
}

export function Header() {
  return (
    <header className="flex flex-col items-start p-[25px_40px] gap-[10px] relative h-[81px] bg-white shadow-[0px_3px_6px_rgba(34,37,37,0.15)]">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" end>
              Create Poll
            </Link>
          </li>
          <li>
            <Link to="/view" end>
              View Polls
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
