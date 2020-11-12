import './App.css';
import { useQuery, gql } from '@apollo/client';

const LAUNCH_INFORMATION = gql`
  query {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function LaunchInformation() {
  const { loading, error, data } = useQuery(LAUNCH_INFORMATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.launches.map(({rocket, launch_success, launch_date_utc, links, details}, index) => (
    <div key={index}>
      <h3>{rocket.rocket_name}</h3>
      <p>
        The launch was scheduled on {launch_date_utc}. The launch was a {launch_success ? 'success' : 'failure'}.s
      </p>
      <h4>Details</h4>
      <p>{details}</p>
      <p> Check out the video <a href={links.video_link}>here</a></p>
    </div>
  ));
}

function App() {
  return (
    <div>
        <h2>My first Apollo app 🚀</h2>
        {LaunchInformation()}
      </div>
  );
}

export default App;
