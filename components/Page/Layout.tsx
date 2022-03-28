interface Props {
  children: React.ReactNode | React.ReactNode[]
}

/** Container for a page. */
export function Layout({ children }: Props) {
  return (
    <main className='flex flex-col justify-center items-center w-full min-h-screen'>
      {children}
    </main>
  )
}