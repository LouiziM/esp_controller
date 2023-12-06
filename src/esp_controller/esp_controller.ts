import { Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';
import { Interval } from '@nestjs/schedule';

let currentLight: string;

async function getLight() {
  try {
    const response = await axios.get('http://192.168.43.102:803/current-light');
    currentLight = response.data.color;
    console.log('Current Light:', currentLight);
  } catch (error) {
    console.error('Error getting current light:', error.message);
    console.error('Error details:', error.response?.data);
  }
}

getLight();
const intervalId = setInterval(getLight, 1000);

@Controller('api')
export class EspController {
  @Get('current-light')
  getCurrentLight(): { currentLight } {
    if (currentLight) {
      return { currentLight };
    } else {
      return { currentLight: 'unknown' };
    }
  }

  @Post('change-sequence-red')
  async changeSequenceRed(): Promise<{ message: string }> {
    return this.changeSequence('red');
  }

  @Post('change-sequence-yellow')
  async changeSequenceYellow(): Promise<{ message: string }> {
    return this.changeSequence('yellow');
  }

  @Post('change-sequence-green')
  async changeSequenceGreen(): Promise<{ message: string }> {
    return this.changeSequence('green');
  }

  private async changeSequence(color: string): Promise<{ message: string }> {
    try {
      const response = await fetch('http://192.168.43.102:803/change-sequence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color }),
      });

      const data = await response.json();
      console.log(data);

      return { message: 'Sequence altered successfully!' };
    } catch (error) {
      console.error('Error changing sequence:', error.message);
      console.error('Error details:', error.response?.data);
      return { message: 'Error changing sequence' };
    }
  }
}
