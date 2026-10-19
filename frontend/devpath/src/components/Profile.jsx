function Profile() {

  const username = localStorage.getItem("username");

  return (
    <div>

      <h1>Profile</h1>

      <h2>
        Welcome, {username}
      </h2>

      <p>
        This is the School Management Dashboard.
      </p>

    </div>
  );
}

export default Profile;