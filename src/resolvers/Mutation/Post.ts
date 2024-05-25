export  const PostResolver ={
    addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
       console.log(userInfo);
       
        if (!userInfo) {
          return {
            userError: "Unauthorized",
            post: null,
          };
        }
        if (!args.title || !args.content) {
          return {
            userError: "title and content required",
            post: null,
          };
        }
        const post = await prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            authorId: userInfo.userId,
          },
        });
    
        return {
          post
        }
      },

      updatePost:async (parent: any, args: any, { prisma, userInfo }: any) => {
      
        if (!userInfo) {
            return {
              userError: "Unauthorized",
              post: null,
            };
          }
          const user = await prisma.user.findUnique({
            where:{
                authorId:userInfo.userId
            }
          })

          if(!user){
            return {
                userError: "user not found",
                post: null,
              };
          }
          const updatePost = await prisma.post.update({
            where:{
                id:Number(args.postId)
            },
            data:
                args.post
            
          })
    return {
        userError:null,
        post:updatePost
    }
    }

    }