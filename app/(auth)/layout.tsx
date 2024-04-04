const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full flex items-center justify-center">
      <nav className="p-1 bg-red-500 w-full">navbar</nav>
      {children}
    </div>
  );
};

export default AuthLayout;
