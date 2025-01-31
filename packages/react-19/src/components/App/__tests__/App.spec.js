import { render, screen, a11yTest } from 'r19-testingUtility';
import { App } from '../App';

describe('/components/App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('React 19 Test Container')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    await a11yTest(<App />);
  });
});
