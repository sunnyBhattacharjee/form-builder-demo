import "../util/style.css"
import { redirect } from 'next/navigation';

export default function Home() {
  // Whenever someone goes to localhost:3000, immediately send them to the login page
  redirect('/login');
}