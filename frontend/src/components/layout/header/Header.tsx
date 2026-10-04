import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Logo from '@/components/ui/Logo';
import CreateTripButton from '@/features/trips/CreateTripButton';
import JoinTripButton from '@/features/trips/JoinTripButton';

import LocationShareButton from './LocationShareButton';
import DarkModeButton from '../../ui/DarkModeButton';

interface HeaderProps {
  onHome: () => void;
  onCreateTrip: () => void;
}

const Header = ({ onHome, onCreateTrip }: HeaderProps) => (
  <AppBar component="header">
    <Toolbar
      disableGutters
      className="mx-auto w-full max-w-4xl justify-between gap-2 px-3 sm:px-4"
    >
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Logo onClick={onHome} />
        <div className="border-l border-border pl-2">
          <LocationShareButton />
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="flex shrink-0 items-center gap-1.5 sm:gap-2"
      >
        <JoinTripButton />
        <CreateTripButton onClick={onCreateTrip} />
        <DarkModeButton />
      </nav>
    </Toolbar>
  </AppBar>
);

export default Header;
