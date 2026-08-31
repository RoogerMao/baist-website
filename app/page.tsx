import { AnimationManager, Landing, Alumni } from "@/components/homepage"

export default function Home() {
  return <AnimationManager top={<Landing />} bottom={<Alumni />} />
}
