import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PagePath } from '@/persistence/enums';

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (![PagePath.Home, '/home'].includes(location.pathname)) {
      navigate(PagePath.Login, { replace: true });
    }
  }, [location.pathname, navigate]);

  return <div>Home</div>;
}
