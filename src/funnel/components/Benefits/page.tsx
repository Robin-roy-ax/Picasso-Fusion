import Benefits from "./index";

interface Props {
  id?: string;
}

export default function Page({ id }: Props) {
  return <Benefits id={id} />;
}
