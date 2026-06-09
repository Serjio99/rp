import { ClipboardList, Rocket } from "lucide-react";
import { ContactSection, PageHero, PageNavigator, PageShell, SectionKicker, SeoHead, VisualStory } from "@/components/SiteChrome";
import { seoTexts, stages } from "@/data/siteContent";

export default function StagesPage() {
  return (
    <>
      <SeoHead
        title="Этапы разработки GTA 5 RP сервера под монетизацию"
        description="Подробные этапы разработки игрового RP-сервера: идея, экономика, FiveM-ядро, Discord, сайт, донат, тестирование, запуск и поддержка."
        path="/stages"
      />
      <PageShell>
        <PageHero
          eyebrow="этапы разработки"
          icon={ClipboardList}
          title={
            <>
              Как создаётся <span className="text-cyan">RP-сервер</span> от идеи до запуска
            </>
          }
          description="Понятный процесс разработки игрового сервера снижает риск хаоса, перерасхода бюджета и бесконечных переделок."
        />

        <VisualStory
          eyebrow="production pipeline"
          icon={ClipboardList}
          image="/rp-production-roadmap.png"
          alt="Неоновая иллюстрация этапов разработки RP-сервера"
          title={
            <>
              Разработка должна идти по <span className="text-lime">маршруту запуска</span>, а не по хаосу задач
            </>
          }
          text="Удобная логистика проекта начинается с понятного плана: что делаем сначала, что можно отложить, где появляются риски и когда сервер уже готов к рекламе."
          points={["Концепция и экономика до сборки", "Тесты до публичного онлайна", "Roadmap обновлений после старта"]}
        />

        <section className="section">
          <div className="shell timeline">
            {stages.map((stage, index) => (
              <article className="timeline-card" key={stage.title}>
                <div className="timeline-card__num">{index + 1}</div>
                <stage.icon size={30} />
                <h2>{stage.title}</h2>
                <p>{stage.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--dark">
          <div className="shell seo-panel">
            <SectionKicker icon={Rocket}>SEO / процесс</SectionKicker>
            <h2>
              Почему этапы важны для <span className="text-lime">монетизации сервера</span>
            </h2>
            <p>{seoTexts.stages}</p>
            <p>
              Если запускать GTA 5 RP сервер без этапов, владелец обычно сталкивается с тем, что сайт уже
              сделан, донат уже обещан, игроки уже ждут, а экономика и права администрации ещё не готовы.
              Поэтому сервер лучше собирать как бизнес-проект: сначала модель и сценарии, затем техническое
              ядро, потом витрина и публичный старт.
            </p>
            <p>
              Такой подход удобен и для заказчика: на каждом шаге понятно, что уже готово, какие решения
              влияют на бюджет, когда можно показывать проект игрокам и какие задачи лучше оставить на
              обновления после релиза.
            </p>
          </div>
        </section>

        <PageNavigator />

        <ContactSection
          title="Нужен план разработки под вашу идею?"
          text="Опишите, какой RP-город хотите запустить. Разложу проект на этапы, риски, бюджет и техническую реализацию."
        />
      </PageShell>
    </>
  );
}
