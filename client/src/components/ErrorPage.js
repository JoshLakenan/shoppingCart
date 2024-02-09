const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error">
      <h1>Something went wrong</h1>
      <p>Please try again later.</p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default ErrorPage;
