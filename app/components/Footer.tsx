// app/components/Footer.tsx
import { FaXTwitter, FaLine } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-8 mt-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* SNSアイコン群 */}
        <div className="flex gap-8">
          {/* 公式X (Twitter) */}
          <a 
            href="https://x.com/PokeKIT430" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-black transition-colors duration-300"
          >
            <FaXTwitter size={36} />
          </a>

          {/* 公式LINE */}
          <a 
            href="https://line.me/R/ti/p/@764couxj" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#06C755] transition-colors duration-300"
          >
            <FaLine size={36} />
          </a>
        </div>

        {/* コピーライト（著作権表示） */}
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} 九州工業大学 ポケモンサークル PokeK!T
        </div>
        
      </div>
    </footer>
  );
}