interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export default function Layout({ children }: Props) {
  return (
    <main className='flex flex-col justify-center items-center px-4 w-full min-h-screen'>
      <div className='w-full max-w-[60rem]'>
        {children}
      </div>
    </main>
  )
}