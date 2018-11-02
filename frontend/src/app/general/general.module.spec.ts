import { GeneralModule } from './general.module';

describe('GeneralModule', () => {
  let generalModule: GeneralModule;

  beforeEach(() => {
    generalModule = new GeneralModule();
  });

  it('should create an instance', () => {
    expect(generalModule).toBeTruthy();
  });
});
