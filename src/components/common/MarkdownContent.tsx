import ReactMarkdown from 'react-markdown';
import { Typography, Box, useTheme } from '@mui/material';

interface MarkdownContentProps {
  content: string;
  variant?: 'body1' | 'body2';
  color?: 'text.primary' | 'text.secondary';
  sx?: any;
}

const MarkdownContent = ({ content, variant = 'body1', color = 'text.primary', sx = {} }: MarkdownContentProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      '& p': { 
        marginBottom: 2,
        '&:last-child': {
          marginBottom: 0
        }
      },
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        marginTop: 3,
        marginBottom: 2,
        fontWeight: 600,
        color: theme.palette.primary.main
      },
      '& ul, & ol': {
        marginTop: 1,
        marginBottom: 2,
        paddingLeft: 3
      },
      '& li': {
        marginBottom: 0.5
      },
      '& code': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        padding: '0.2em 0.4em',
        borderRadius: 3,
        fontSize: '0.9em'
      },
      '& pre': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        padding: '1em',
        borderRadius: 4,
        overflow: 'auto',
        marginBottom: 2
      },
      '& blockquote': {
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        marginLeft: 0,
        paddingLeft: 2,
        fontStyle: 'italic',
        color: theme.palette.text.secondary
      },
      ...sx
    }}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <Typography variant={variant} color={color} component="p">
              {children}
            </Typography>
          ),
          h1: ({ children }) => (
            <Typography variant="h4" component="h1">
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" component="h2">
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" component="h3">
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography variant="subtitle1" component="h4" fontWeight="bold">
              {children}
            </Typography>
          ),
          h5: ({ children }) => (
            <Typography variant="subtitle2" component="h5" fontWeight="bold">
              {children}
            </Typography>
          ),
          h6: ({ children }) => (
            <Typography variant="subtitle2" component="h6" fontWeight="bold">
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Typography variant={variant} color={color} component="ul">
              {children}
            </Typography>
          ),
          ol: ({ children }) => (
            <Typography variant={variant} color={color} component="ol">
              {children}
            </Typography>
          ),
          li: ({ children }) => (
            <Typography variant={variant} color={color} component="li">
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <Typography variant={variant} color={color} component="blockquote">
              {children}
            </Typography>
          ),
          code: ({ children }) => (
            <Typography variant={variant} component="code">
              {children}
            </Typography>
          ),
          pre: ({ children }) => (
            <Typography variant={variant} component="pre">
              {children}
            </Typography>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownContent; 