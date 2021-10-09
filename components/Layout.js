export default function Layout({ children }) {
  return (
    <main className="flex flex-col flex-grow content-center justify-center mx-4 xl:mx-20">
      {children}
    </main>
  )
}