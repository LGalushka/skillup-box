import { MainLayout } from './components/layout/MainLayout';

function App() {
  return (
    <>
      <MainLayout>
        <div className="gap-md flex flex-col items-center text-center">
          <h1 className="text-text-primary text-2xl font-bold">
            Мои тренировки
          </h1>
          <p className="text-text-secondary">
            Здест скоро будет сетка с карточками проектов
          </p>

          <div className="gap-sm mt-4 flex">
            <div className="p-xl bg-card rounded-box border-border-color">
              Карточка 1
            </div>
            <div className="p-xl bg-card rounded-box border-border-color">
              Карточка 2
            </div>
            <div className="p-xl bg-card rounded-box border-border-color">
              Карточка 3
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default App;
