'use client'

import { Button } from "@/components/ui/button";
import { login } from '../actions/sign'

export default function GithubLogin() {
  return <Button variant={'outline'} onClick={() => login('github')}>
    Sign In with Github
  </Button>
}