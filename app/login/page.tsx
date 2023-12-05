'use client';

export default function LoginPage() {

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.status === 200) {
      window.location.href = '/'
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
