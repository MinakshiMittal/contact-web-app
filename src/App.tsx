import { ErrorBox, Loading, Toast } from "./components";
import Routes from "./routes";
import { useAppSelector } from "./store/hooks";
import { errorSelector } from "./store/slices/errorSlice";
import { loadingSelector } from "./store/slices/loadingSlice";
import { toastSelector } from "./store/slices/toastSlice";
import { userSelector } from "./store/slices/userSlice";

function App() {
  const error = useAppSelector(errorSelector);
  const loading = useAppSelector(loadingSelector);
  const toast = useAppSelector(toastSelector);
  const user = useAppSelector(userSelector);
  console.log(user.otherAccounts);

  return (
    <div className="App relative">
      <Routes />
      {loading.loading && <Loading />}
      {error.hasErrors && <ErrorBox errorMessage={error.errorMessage} />}
      {toast.showToast && <Toast toastMessage={toast.successMessage} />}
    </div>
  );
}

export default App;
