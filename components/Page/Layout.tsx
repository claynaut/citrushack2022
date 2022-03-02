interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export function Layout({ children }: Props) {
  return (
    <main className='flex flex-col justify-center items-center px-4 w-full min-h-screen'>
      {children}
    </main>
  )
}