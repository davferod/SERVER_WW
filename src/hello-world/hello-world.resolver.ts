import { Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
    @Query(() => String)
    helloWorld(): string {
        return 'Hello World!';
    }

    @Query(() => Float, { name: 'randomNumber' })
    randomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, { name: 'randomFromZeroToTen' })
    randomFromZeroToTen(): number {
        const zeroToten = Math.random() * 10;
        return Math.floor(zeroToten); // integer between 0 and 10
    }
}
