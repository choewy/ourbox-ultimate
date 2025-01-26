import { UserGridTable } from './components/user.grid-table';
import { UserSearchForm } from './components/user.search-form';
import { UserToolbar } from './components/user.toolbar';

export default function UserPage() {
  return (
    <>
      <UserSearchForm />
      <UserToolbar />
      <UserGridTable />
    </>
  );
}
