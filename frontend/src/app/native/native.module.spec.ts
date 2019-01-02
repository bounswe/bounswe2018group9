import { NativeModule } from './native.module';

describe('NativeModule', () => {
  let nativeModule: NativeModule;

  beforeEach(() => {
    nativeModule = new NativeModule();
  });

  it('should create an instance', () => {
    expect(nativeModule).toBeTruthy();
  });
});
