import { testimonials } from "../data/mockData";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#070710] py-24">
      <div className="absolute inset-0 futuristic-grid-small opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-300/60">
            Student stories
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            What students
            <br />
            <span className="gradient-text">say about Peerly.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="glass group rounded-[26px] p-6 transition duration-500 hover:-translate-y-2 hover:border-violet-400/20"
            >
              <div className="text-4xl leading-none text-violet-400/30">
                “
              </div>

              <p className="mt-3 text-sm leading-7 text-white/45">
                {item.quote}
              </p>

              <div className="my-5 h-px bg-white/5" />

              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-black">
                  {item.initials}
                </div>

                <div>
                  <div className="text-xs font-bold text-white">
                    {item.name}
                  </div>

                  <div className="mt-1 text-[9px] text-white/30">
                    {item.course}
                  </div>
                </div>
              </div>

              <div className="mt-5 text-[10px] text-cyan-300">
                ★★★★★
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}