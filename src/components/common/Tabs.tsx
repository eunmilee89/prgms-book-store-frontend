import { Theme } from '@/style/theme';
import React, { useState } from 'react';
import styled from 'styled-components';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

function Tab({ children }: TabProps) {
  return <>{children}</>;
}

interface TabsProps {
  children: React.ReactNode;
}

function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  return (
    <StyledTabs>
      <div className='tab-header'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className='tab-content'>{tabs[activeIndex]}</div>
    </StyledTabs>
  );
}

const StyledTabs = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border: none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => (theme as Theme).color.primary};
      border-radius: ${({ theme }) => (theme as Theme).borderRadius.default}
        ${({ theme }) => (theme as Theme).borderRadius.default} 0 0;
      padding: 12px 24px;

      &.active {
        color: #fff;
        background: ${({ theme }) => (theme as Theme).color.primary};
      }
    }
  }

  .tab-content {
    padding: 24px 0;
  }
`;

export { Tabs, Tab };
