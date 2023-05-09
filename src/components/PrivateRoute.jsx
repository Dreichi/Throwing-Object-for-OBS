import { useParams } from 'react-router-dom';

const PrivateRoute = ({ children, username }) => {
  const params = useParams();

  return params.username === username ? children : <h1>Accès non autorisé</h1>;
};

export default PrivateRoute;