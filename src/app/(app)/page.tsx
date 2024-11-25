"use client";

import { Button } from "@/components/ui/button";
import { Mail, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-32 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-300">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg bg-gray-800"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="p-6 bg-gradient-to-r from-gray-800 to-gray-700"
              >
                <Card className="bg-gray-900 text-white shadow-xl border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-teal-400" />
                    <div>
                      <p className="text-base">{message.content}</p>
                      <p className="text-xs text-gray-500">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* GitHub Button */}
        <div className="mt-10">
          <Button
            variant="default"
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-teal-300 hover:to-blue-400 transition-transform transform hover:scale-105"
            asChild
          >
            <a
              href="https://github.com/sagar-puniyani/feedback.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2 inline-block" />
              Visit GitHub
            </a>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-900 text-gray-400">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </>
  );
}
