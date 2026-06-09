import { MessageSquareWarning, ShieldAlert } from "lucide-react";
import { ContactSection, PageHero, PageNavigator, PageShell, SectionKicker, SeoHead, VisualStory } from "@/components/SiteChrome";
import { problems, seoTexts } from "@/data/siteContent";

export default function ProblemsPage() {
  return (
    <>
      <SeoHead
        title="Проблемы разработки RP-сервера: экономика, донат, лаги, удержание"
        description="Актуальные вопросы разработки GTA 5 RP сервера: как избежать хаоса в экономике, pay-to-win доната, лагов, плохой модерации и падения онлайна."
        path="/problems"
      />
      <PageShell>
        <PageHero
          eyebrow="проблемы и риски"
          icon={ShieldAlert}
          title={
            <>
              Где ломается <span className="text-pink">RP-сервер</span> и как этого избежать
            </>
          }
          description="Большинство RP-проектов умирает не из-за плохой идеи, а из-за слабой архитектуры, хаотичной экономики и отсутствия плана развития."
        />

        <VisualStory
          eyebrow="аудит рисков"
          icon={ShieldAlert}
          image="/rp-live-support.png"
          alt="Операционный центр поддержки и мониторинга RP-сервера"
          title={
            <>
              Риски сервера нужно видеть <span className="text-cyan">до жалоб игроков</span>
            </>
          }
          text="Лаги, ошибки выдачи доната, конфликтные правила и сломанная экономика обычно проявляются уже на онлайне. Лучше заложить мониторинг, логи и сценарии поддержки заранее."
          points={["Логи, txAdmin и контроль нагрузки", "Правила для спорных ситуаций", "План исправлений после теста"]}
        />

        <section className="section">
          <div className="shell problem-grid">
            {problems.map((problem) => (
              <article className="problem-card" key={problem.title}>
                <problem.icon size={30} />
                <h2>{problem.title}</h2>
                <p>{problem.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--dark">
          <div className="shell seo-panel">
            <SectionKicker icon={MessageSquareWarning}>актуальные вопросы</SectionKicker>
            <h2>
              RP-сервер нужно проектировать как <span className="text-lime">живую систему</span>
            </h2>
            <p>{seoTexts.problems}</p>
            <p>
              Перед запуском важно ответить на вопросы: кто целевая аудитория, какие фракции будут создавать
              конфликты, зачем игрок возвращается через неделю, какие покупки не ломают баланс, кто модерирует
              спорные ситуации, как быстро исправляются баги и как сервер будет обновляться после первого
              рекламного всплеска.
            </p>
            <p>
              Для владельца это не абстрактная теория: каждая нерешенная проблема превращается в потерю
              игроков, токсичный Discord, возвраты, споры по донату и срочные ночные правки вместо планового
              развития проекта.
            </p>
          </div>
        </section>

        <PageNavigator />

        <ContactSection
          title="Уже есть сервер с проблемами?"
          text="Можно провести аудит экономики, ресурсов, доната, Discord-процессов и плана развития, а затем собрать понятный список исправлений."
        />
      </PageShell>
    </>
  );
}
