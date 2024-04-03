import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScanEye, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badged } from "./badged";


interface ImagePickerProps {
  images: string[];
  setImages: (values: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  disabledPreview?: boolean;
}

export function ImagePicker(
  {
    images,
    setImages,
    multiple,
    disabled,
    disabledPreview
  }: ImagePickerProps
) {

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(multiple ? [...images, ...urls] : urls);
    }
  }

  const handleRemoveImage = (url: string) => {
    setImages(images.filter(image => image !== url));
  }

  return (

    <div className="flex w-[240px] items-center">
      <Button
        disabled={disabled}
        type="button"
        variant="outline"
        className="w-[200px] text-muted-foreground"
        onClick={() => inputRef.current?.click()}>
        Select image{multiple ? "s" : ""}
      </Button>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple={multiple}
        accept="image/*"
        onChange={handleSelectImage}
      />
      <Popover>

        <Badged
          count={images.length}
          position="top-right"
        ><PopoverTrigger asChild>
            <Button
              className="w-[40px]"
              variant="outline"
              size="icon"
              type="button"
              disabled={disabledPreview}
            >
              <ScanEye size={20} />
            </Button>
          </PopoverTrigger>
        </Badged>

        <PopoverContent>
          {
            images.length > 0 ? <div className="flex flex-col space-y-2 overflow-y-auto max-h-96 max-w-[240px]">
              {images.map((url, index) => (
                <div key={url} className="flex flex-col items-center border border-border rounded-md p-2">
                  <Image
                    src={url}
                    height={240}
                    width={240}
                    alt="image"
                    className="rounded-md border border-border"
                  />
                  {!disabled && (
                    <Button
                      disabled={disabled}
                      type="button"
                      variant="destructive"
                      className="flex space-x-2 w-full mt-2 justify-center items-center"
                      onClick={() => handleRemoveImage(url)}
                    >
                      <span>Remove</span>
                      <X size={20} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
              : (
                <span>No image selected</span>
              )
          }
        </PopoverContent>
      </Popover>
    </div >

  );
}
