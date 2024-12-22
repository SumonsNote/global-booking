// "use client";
// import classNames from "embla-carousel-class-names";
// import {
//   Carousel,
//   CarouselButtons,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselItem,
//   CarouselNextButton,
//   CarouselPrevButton,
//   CarouselSlides,
// } from "keep-react";
// import Image from "next/image";
// import Link from "next/link";

// const Trending = ({ trendingHotels }) => {
//   return (
//     <Carousel options={{ loop: true }} plugins={[classNames()]}>
//       <CarouselSlides>
//         {trendingHotels.map((hotel) => (
//           <CarouselItem
//             key={hotel.id}
//             className="flex-[0_0_40%] [&:not(.is-snapped)]:opacity-[0.16]"
//           >
//             <Link href={`/hotels/${hotel.id}`}>
//               <Image
//                 className="rounded-md"
//                 src={hotel?.thumbNailUrl}
//                 width={350}
//                 height={300}
//                 alt="Carousel Item"
//               />
//             </Link>
//           </CarouselItem>
//         ))}
//       </CarouselSlides>
//       <CarouselControl>
//         <CarouselButtons>
//           <CarouselPrevButton />
//           <CarouselNextButton />
//         </CarouselButtons>
//         <CarouselIndicators />
//       </CarouselControl>
//     </Carousel>
//   );
// };

// export default Trending;
