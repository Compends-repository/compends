import User_Informations_List from "../features/listRendering/userInformations";

type userInformations = {
  Bimg: string;
  GETusers: object;
};

const usuarios = [
  {
    id: 1,
    name: "Luninjag",
    bio: "Fundador e proprietário da Compends - empresa trilionária - mudando vidas",
    Pimg: "https://cdn.phototourl.com/member/2026-10-17-c0999933-cb40-4285-8608-898e689d075c.jpg",
    Bimg: "https://external-preview.redd.it/4k-space-wallpapers-are-the-best-here-is-a-few-i-like-v0-1yG8xcy8VWGl3Q5oOZ6r_vGFqZQdpoW8MknJggX8KS4.jpeg?auto=webp&s=cc4cd69a2f8f64a883163f09b5400d52701a6d39",
  },
  {
    id: 2,
    name: "john Hin Timoth Leer",
    bio: "Gamer de fim de semana, viciado em RPG e café. Sempre procurando gente para jogar em dupla.",
    Pimg: "https://cdn.phototourl.com/member/2026-10-17-49c69f54-99d9-409e-9143-656439cafb2f.jpg",
    Bimg: "https://images.pexels.com/photos/34169628/pexels-photo-34169628.jpeg?cs=srgb&dl=pexels-raulling-34169628.jpg&fm=jpg",
  },
  {
    id: 3,
    name: "JohnHTbomHomem",
    bio: "Streamer nas horas vagas. Jogo de tudo um pouco, mas sou fã mesmo de FPS e jogos de terror.",
    Pimg: "https://cdn.phototourl.com/member/2026-10-17-13e29338-bab2-4202-a4cb-a6fda5615207.jpg",
    Bimg: "https://images8.alphacoders.com/135/1354199.jpeg",
  },
  {
    id: 4,
    name: "VROM",
    bio: "Competitivo por natureza. Ranqueada até o talo, e sim, a culpa é sempre do time.",
    Pimg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMaYCftOqdV0Va0cEQsxT5XMX7zL90cc4GaqkHkoxwQ&s=10",
    Bimg: "https://images.pexels.com/photos/4991338/pexels-photo-4991338.jpeg?cs=srgb&dl=pexels-kienvirak-4991338.jpg&fm=jpg",
  },
  {
    id: 5,
    name: "Luninjag2",
    bio: "Conta secundária do Luninjag. Aqui eu testo coisas novas antes de lançar na Compends.",
    Pimg: "/CapsuleDraft.webp",
    Bimg: "https://wallpaperaccess.com/full/32591.jpg",
  },
  {
    id: 6,
    name: "MeJulgue_021688",
    bio: "Sejam sinceros. Terminei recentemente e vi umas amigas da minha ex no twitter falando que eu era muito feio etc.. É tão ruim assim?",
    Pimg: "https://preview.redd.it/sejam-sinceros-terminei-recentemente-e-vi-umas-amigas-da-v0-606s0ynatfug1.jpg?width=828&format=pjpg&auto=webp&s=97de74a6acb678b083710c58c315308cc3ef68f0",
    Bimg: "https://static.vecteezy.com/system/resources/thumbnails/079/340/497/small_2x/4k-epic-mountain-sunrise-landscape-with-snow-peaks-golden-light-misty-valleys-and-dramatic-sky-ultra-hd-nature-wallpaper-background-photo.jpg",
  },
];

export default function Discover_new_preople({ Bimg, GETusers }: userInformations) {
  return (
    <div className="relative isolate">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat brightness-78"
        style={{ backgroundImage: "url('/perfilBackExample.png')", zIndex: -1 }}
      ></div>

      <div>
        <User_Informations_List GETusers={usuarios} />
      </div>
    </div>
  );
}
