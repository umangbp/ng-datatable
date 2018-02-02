import { DataGridPage } from './app.po';

describe('data-grid App', () => {
  let page: DataGridPage;

  beforeEach(() => {
    page = new DataGridPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
