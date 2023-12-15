const Loading = () => {
  return (
    <main
      className="w-full h-screen flex justify-center items-center bg-cover bg-repeat"
      style={{ backgroundImage: `url(./bg.png)` }}
    >
      <h1 className="font-extrabold text-[80px] text-blue-950">LOADING....</h1>
    </main>
  );
};

export default Loading;
