import { type NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import { join } from 'path';
import { ImageResponse } from 'next/og';
import { format } from 'date-fns';

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf');
let fontData = fs.readFileSync(fontPath);
const fontPath2 = join(process.cwd(), 'DancingScript-Regular.ttf');
let fontData2 = fs.readFileSync(fontPath2);
const fontPath3 = join(process.cwd(), 'Jersey25-Regular.ttf');
let fontData3 = fs.readFileSync(fontPath3);

const imagePath = join(process.cwd(), 'BFF_background.png');
let imageData = fs.readFileSync(imagePath);
// conver imageDAta to arrayBuffer to be passed into img
imageData = new Uint8Array(imageData).buffer;

const mapPath = join(process.cwd(), 'map_background.jpeg');
let mapData = fs.readFileSync(mapPath);
// conver imageDAta to arrayBuffer to be passed into img
mapData = new Uint8Array(mapData).buffer;

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get('lat') || '49.2734';
  const long = request.nextUrl.searchParams.get('long') || '49.2734';
  const name1 = request.nextUrl.searchParams.get('name1') || 'Don';
  const name2 = request.nextUrl.searchParams.get('name2') || 'Ash';
  const date = request.nextUrl.searchParams.get('date') || '28th Oct 2024';
  const time = request.nextUrl.searchParams.get('time') || '12:30 PM';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 46,
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            background: 'white',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 20,
              fontSize: 20,
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                marginBottom: 20,

                textAlign: 'center',
                justifyContent: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Inter',
              }}
            >
              <img
                width="425"
                height="425"
                src={mapData}
                style={{
                  position: 'absolute',
                  top: 70,
                  left: 50,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  color: 'black',
                  fontFamily: 'Inter',
                  opacity: 0.8,
                }}
              ></img>
              <img width="510" height="510" src={imageData}></img>

              <div
                style={{
                  position: 'absolute',
                  top: 200,
                  left: 180,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 35,
                  fontWeight: 'bold',
                  color: 'black',
                  fontFamily: 'Inter',
                }}
              >
                {`${name1} 🙌 ${name2}`}
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 38,
                  left: 80,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'DancingScript2',
                }}
              >
                {`${lat}° n`}
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 38,
                  left: 320,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'DancingScript2',
                }}
              >
                {`${long}° w`}
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 455,
                  left: 40,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'DancingScript2',
                }}
              >
                {date}
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 465,
                  left: 320,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'DancingScript2',
                }}
              >
                {time}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'DancingScript',
          data: fontData2,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'DancingScript2',
          data: fontData3,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}

// // sometime, date here is a string not Date
// function formatDate(date: Date, withTime = false, timeOnly = false, dateOnly = false) {
//   const dateConverted = new Date(`${date}`);
//   if (withTime) {
//     return format(dateConverted, 'MMM d h:mm a');
//   }
//   if (timeOnly) {
//     return format(dateConverted, 'h:mm a');
//   }
//   if (dateOnly) {
//     return format(dateConverted, 'd');
//   }

//   return format(dateConverted, 'MMM d');
// }
