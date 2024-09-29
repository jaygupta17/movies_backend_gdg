import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { Movie } from "@/lib/data"
import Link from "next/link"
import { parseTitleForUrl } from "@/lib/utils"

export default function MovieFeed({movies}:{movies:Movie[]}) {
  return (
    <div className="container mx-auto py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <Card key={movie.id} className="overflow-hidden group hover:bg-white/5 dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="aspect-video group-hover:backdrop-blur-[10px] relative">
              {/* <img
                src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(movie.title)}`}
                alt={movie.title}
                className="object-cover w-full h-full"
              /> */}
              <div className="hidden absolute z-3 w-full px-2 top-[35%] left-[50%] translate-x-[-50%] text-center text-sm font-normal  group-hover:flex">{movie.descr}</div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 text-yellow-400 fill-yellow-400`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{movie.rating}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
            <Link className="w-full" href={"/"+movie.id}>
              <Button className="w-full">
                  View
              </Button>
            </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}