import { useActionState } from 'react';

// ฟังก์ชันสำหรับดึงข้อมูลโพสต์แบบสุ่ม
async function fetchPostsAction() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await response.json();
    
    return {
      posts,
      error: null,
      lastAction: 'posts'
    };
  } catch (error) {
    return {
      posts: null,
      error: error.message,
      lastAction: 'posts'
    };
  }
}

function PostsExample() {
  // สถานะเริ่มต้นสำหรับ useActionState
  const initialState = {
    posts: null,
    error: null,
    lastAction: null
  };

  // ใช้ useActionState สำหรับดึงข้อมูลโพสต์
  // postsState = สถานะปัจจุบัน, postsAction = ฟังก์ชันเรียก action, isPostsPending = สถานะ loading
  const [postsState, postsAction, isPostsPending] = useActionState(fetchPostsAction, initialState);

  // สำหรับการจัดการ state โพสต์
  const combinedState = {
    posts: postsState.posts,
    error: postsState.error,
    lastAction: postsState.lastAction
  };

  const handlePostsSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    postsAction(formData); // เรียก action ผ่าน useActionState
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2>Posts Example - useActionState</h2>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <form onSubmit={handlePostsSubmit}>
          <button
            type="submit"
            disabled={isPostsPending} // ปิดการใช้งานปุ่มเมื่อ pending
            style={{
              padding: '10px 20px',
              backgroundColor: isPostsPending ? '#ccc' : '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isPostsPending ? 'not-allowed' : 'pointer'
            }}
          >
            {isPostsPending ? 'Loading...' : 'Get Random Posts'} {/* แสดงสถานะ loading จาก isPending */}
          </button>
        </form>
      </div>

      {/* แสดงตัวบ่งชี้การโหลดเมื่อมี action ใดๆ กำลังทำงาน */}
      {isPostsPending && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          🔄 Fetching posts...
        </div>
      )}

      {/* Error display */}
      {combinedState.error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24',
          marginBottom: '10px'
        }}>
          ❌ Error: {combinedState.error}
        </div>
      )}

      {/* Quote display */}
      {combinedState.quote && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#d1f2eb', 
          border: '1px solid #76d7c4',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h3>💭 Random Quote:</h3>
          <blockquote style={{ 
            fontStyle: 'italic', 
            margin: '10px 0',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            "{combinedState.quote.content}"
          </blockquote>
          <p style={{ textAlign: 'right', fontWeight: 'bold' }}>
            — {combinedState.quote.author}
          </p>
        </div>
      )}

      {/* Posts display */}
      {combinedState.posts && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#e3f2fd', 
          border: '1px solid #90caf9',
          borderRadius: '4px'
        }}>
          <h3>📝 Random Posts:</h3>
          {combinedState.posts.map(post => (
            <div key={post.id} style={{ 
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #e0e0e0'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>
                {post.title}
              </h4>
              <p style={{ margin: 0, lineHeight: '1.4' }}>
                {post.body}
              </p>
              <small style={{ color: '#666' }}>Post ID: {post.id}</small>
            </div>
          ))}
        </div>
      )}

      {/* Status info */}
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>Status:</strong> {
          isPostsPending ? 'Loading posts...' : 
          combinedState.lastAction ? `Last action: ${combinedState.lastAction}` : 
          'Ready'
        }</p>
        <p><strong>คุณสมบัติหลัก:</strong></p>
        <ul style={{ margin: '5px 0' }}>
          <li>ใช้ <code>useActionState</code> สำหรับจัดการ async action</li>
          <li>มีสถานะ pending สำหรับแสดง loading state</li>
          <li>การจัดการ error แบบ built-in</li>
          <li>ง่ายต่อการใช้งานกับ form submission</li>
        </ul>
      </div>
    </div>
  );
}

export default PostsExample;
