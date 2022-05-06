#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform float material_shininess;
uniform vec2 texture_scale;
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;
out vec2 frag_texcoord;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    frag_texcoord = vertex_texcoord * texture_scale;
    
    ambient = light_ambient;
    vec3 normal = normalize(transpose(inverse(mat3(model_matrix))) * vertex_normal);
    vec3 position = vec3(model_matrix * vec4(vertex_position,1.0));
    vec3 view_vector = normalize(camera_position - position);
    
    for(int i = 0; i < 10; i++)
    {
        vec3 light_vector = normalize(light_position[i] - position);
        float N_dot_L = dot(normal, light_vector);
        if(N_dot_L < 0.0)
        {
            N_dot_L = 0.0;
        }
        vec3 reflection = normalize(reflect(-light_vector, normal));
        float R_dot_V = dot(reflection, view_vector);
        if(R_dot_V < 0.0)
        {
            R_dot_V = 0.0;
        }

        diffuse += light_color[i] * N_dot_L;
        specular += light_color[i] * pow(R_dot_V, material_shininess);
    }
}
