import { render, screen } from '@testing-library/react';
import GlitchText from '../GlitchText';

describe('GlitchText', () => {
  it('renders the text correctly', () => {
    render(<GlitchText>Test Text</GlitchText>);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('renders as h1 by default', () => {
    const { container } = render(<GlitchText>Heading</GlitchText>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('renders with custom element', () => {
    const { container } = render(<GlitchText as="h2">Heading 2</GlitchText>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<GlitchText className="custom-class">Text</GlitchText>);
    const element = container.querySelector('.custom-class');
    expect(element).toBeInTheDocument();
  });
});
