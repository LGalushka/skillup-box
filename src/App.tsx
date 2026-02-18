import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';

function App() {
  return (
    <>
      <Button>dsfdf</Button>
      <Button variant="danger">HHHHH</Button>
      <Button variant="secondary" disabled>
        OOOO
      </Button>

      <Input placeholder="Введите что нибудь" />
    </>
  );
}

export default App;
