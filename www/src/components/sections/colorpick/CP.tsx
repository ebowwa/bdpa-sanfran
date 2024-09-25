// @/components/ColorPicker/index.tsx

import React from 'react';
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/common/card";
import { Input } from "@/components/ui/common/input";
import { Button } from "@/components/ui/common/button";
import ColorButton from '@/components/sections/colorpick/ColorButton';
import colorClasses from '@/components/sections/colorpick/ColorConfig'; // Import the color configuration

export default function ColorPicker() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4">Color Picker</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-5 gap-2 mb-4">
        {colorClasses.map((color, index) => (
          <ColorButton key={index} color={color} />
        ))}
        <ColorButton color="bg-gray-500" hasIcon={true} />
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Input className="w-32" id="color" placeholder="#000000" />
        <Button variant="outline">Clear</Button>
      </CardFooter>
    </Card>
  )
}

