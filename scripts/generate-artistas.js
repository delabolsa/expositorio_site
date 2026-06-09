// scripts/generate-artistas.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const artistasPath = path.resolve(__dirname, '../src/data/artistas.json');
const outputDir = path.resolve(__dirname, '../src/pages/artistas');

// Leer artistas.json
const artistas = JSON.parse(fs.readFileSync(artistasPath, 'utf-8'));

// Crear la carpeta si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Para cada artista, generar un archivo .astro
artistas.forEach(artista => {
  const slug = artista.slug;
  const content = `---
// Página generada automáticamente para ${artista.data.nombre}
import BaseLayout from "@/layouts/BaseLayout.astro";
import artistasData from "../../data/artistas.json";
import obrasData from "../../data/obras.json";

const artista = artistasData.find(a => a.slug === "${slug}");
const obrasArtista = obrasData.filter(obra => obra.data.artista === "${slug}");

if (!artista) {
  return <BaseLayout title="Error">Artista no encontrado</BaseLayout>;
}
---

<BaseLayout title={\`${artista.data.nombre} - Expositorio Voyeur\`}>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <!-- Mismo HTML del perfil (copiado desde [slug].astro) -->
    <div class="grid md:grid-cols-3 gap-10">
      <div>
        {artista.data.foto && <img src={artista.data.foto} alt={artista.data.nombre} class="w-full rounded-xl shadow" />}
        <div class="mt-6 space-y-3 text-sm text-base-700">
          {artista.data.fechaNacimiento && <p><span class="font-semibold">Nacimiento:</span> {artista.data.fechaNacimiento}</p>}
          {artista.data.medio && <p><span class="font-semibold">Medio:</span> {artista.data.medio}</p>}
          {artista.data.instagram && (
            <p><span class="font-semibold">Instagram:</span> <a href={\`https://instagram.com/\${artista.data.instagram.replace('@','')}\`} target="_blank" class="text-[#B70538] hover:underline">{artista.data.instagram}</a></p>
          )}
          {artista.data.email && (
            <p><span class="font-semibold">Email:</span> <a href={\`mailto:\${artista.data.email}\`} class="text-[#B70538] hover:underline">{artista.data.email}</a></p>
          )}
          {artista.data.entrevistaDisponible && (
            <div class="mt-4 inline-block bg-[#B70538] text-white text-xs px-3 py-1 rounded-full">Entrevista disponible</div>
          )}
        </div>
      </div>

      <div class="md:col-span-2">
        <h1 class="text-4xl font-bold">{artista.data.nombre}</h1>
        {artista.data.biografia && <p class="mt-4 text-base-700 italic">{artista.data.biografia}</p>}
        {artista.data.biografiaLarga && (
          <div class="prose max-w-none mt-6" set:html={artista.data.biografiaLarga.replace(/\\n/g, '<br/>')} />
        )}

        {artista.data.premios && artista.data.premios.length > 0 && (
          <>
            <h2 class="text-2xl font-semibold mt-8">Premios y selecciones</h2>
            <ul class="list-disc list-inside space-y-1">
              {artista.data.premios.map(p => <li>{p}</li>)}
            </ul>
          </>
        )}

        {artista.data.participaciones && artista.data.participaciones.length > 0 && (
          <>
            <h2 class="text-2xl font-semibold mt-8">Exposiciones</h2>
            <ul class="list-disc list-inside space-y-1">
              {artista.data.participaciones.map(p => <li>{p}</li>)}
            </ul>
          </>
        )}

        {artista.data.experienciaExtra && artista.data.experienciaExtra.length > 0 && (
          <>
            <h2 class="text-2xl font-semibold mt-8">Experiencia extra</h2>
            <ul class="list-disc list-inside space-y-1">
              {artista.data.experienciaExtra.map(e => <li>{e}</li>)}
            </ul>
          </>
        )}

        <h2 class="text-2xl font-semibold mt-10 mb-6">Obras</h2>
        {obrasArtista.length === 0 ? (
          <p class="text-base-500">Próximamente obras de este artista.</p>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {obrasArtista.map(obra => (
              <a href={\`/obras/\${obra.slug}\`} class="group bg-base-100 rounded-lg border border-base-200 p-4 hover:shadow transition">
                {obra.data.imagen && <img src={obra.data.imagen} class="w-full h-48 object-cover rounded mb-3" />}
                <h3 class="font-bold text-lg">{obra.data.titulo}</h3>
                <p class="text-sm text-base-500">{obra.data.ano} · {obra.data.tecnica}</p>
                {obra.data.descripcion && <p class="text-sm mt-2">{obra.data.descripcion}</p>}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
</BaseLayout>
`;
  const filePath = path.join(outputDir, `${slug}.astro`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Generado: ${filePath}`);
});

console.log('Generación completada.');
